# Design: Product Catalog MVP

## Technical Approach

The product catalog MVP will be implemented using React Native with Expo for cross-platform development. We'll use TanStack Query for data fetching and state management, Styled Components for reusable UI styling, and React Navigation for screen transitions. Product data will be fetched from Supabase following a clean separation of concerns between UI, data access, and navigation layers.

## Architecture Decisions

### Decision: State Management with TanStack Query

**Choice**: Use TanStack Query (formerly React Query) for all data fetching, caching, and state management needs
**Alternatives considered**: Redux Toolkit, React Context API, MobX, Apollo Client
**Rationale**: TanStack Query provides excellent caching, background updates, deduplication of requests, and built-in loading/error states out of the box. It's lightweight and perfectly suited for the product catalog's data fetching needs without the boilerplate of Redux or complexity of GraphQL solutions.

### Decision: Component-Based UI with Styled Components

**Choice**: Use Styled Components for all styling in the product catalog
**Alternatives considered**: CSS Modules, Tailwind React Native, NativeBase, React Native Paper
**Rationale**: Styled Components provides scoped styling, theming capabilities, and allows us to create reusable, theme-aware components that align with our design system. It integrates well with React Native and supports responsive design patterns.

### Decision: Navigation Structure with React Navigation

**Choice**: Use React Navigation v6 for screen navigation
**Alternatives considered**: React Native Navigation, Expo Router, custom navigation solution
**Rationale**: React Navigation is the most mature and widely adopted navigation solution for React Native, offering excellent performance, deep linking support, and a large ecosystem. It's well-suited for our navigation needs between product listing and detail screens.

### Decision: Data Access Layer with Supabase Client

**Choice**: Create a dedicated Supabase service layer for data access
**Alternatives considered**: Direct Supabase calls in components, GraphQL wrapper, REST API abstraction
**Rationale**: A dedicated service layer provides a clean abstraction over Supabase, making it easier to mock for testing, change data sources in the future, and centralize error handling and transformation logic.

## Data Flow

```
User Interaction ──→ React Navigation ──→ Screen Components
                              │                    │
                              ▼                    ▼
                    TanStack Query ←──── Supabase Service
                              │                    │
                              ▼                    ▼
                    Cached Data ────→ Supabase API
```

1. User navigates to ProductListScreen via React Navigation
2. Screen component uses TanStack Query's useQuery hook to fetch products
3. TanStack Query calls the Supabase service function to get data
4. Supabase service makes actual API call to Supabase backend
5. Data flows back through the same path: Supabase → Service → TanStack Query → Component
6. TanStack Query caches the data and provides loading/error states to the component
7. Component renders UI using Styled Components

## File Changes

| File | Action | Description |
|------|--------|-------------|
| `src/screens/ProductListScreen.js` | Create | Main product listing screen with grid layout, loading/error states, and category filtering |
| `src/screens/ProductDetailScreen.js` | Create | Detailed view of individual product with image, description, price, and category |
| `src/components/ProductCard.js` | Create | Reusable component for displaying product information in grid/list format |
| `src/components/CategoryFilter.js` | Create | Reusable component for filtering products by category |
| `src/services/supabase.js` | Modify | Extended to include product data fetching methods (getProducts, getProductById) |
| `src/navigation/AppNavigator.js` | Modify | Added routes for ProductListScreen and ProductDetailScreen |
| `src/styles/theme.js` | Modify | Extended theme with product catalog specific colors, spacing, and typography |
| `src/styles/ProductListStyles.js` | Create | Styled Components for product listing screen |
| `src/styles/ProductDetailStyles.js` | Create | Styled Components for product detail screen |
| `src/styles/ProductCardStyles.js` | Create | Styled Components for product card component |
| `src/styles/CategoryFilterStyles.js` | Create | Styled Components for category filter component |
| `src/types/product.ts` | Create | TypeScript interfaces for Product and related data structures |
| `src/hooks/useProducts.ts` | Create | Custom hook encapsulating TanStack Query usage for product data |
| `src/hooks/useCategories.ts` | Create | Custom hook for fetching and managing category filters |

## Interfaces / Contracts

```typescript
// src/types/product.ts
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  created_at: string;
  updated_at: string;
}

export interface ProductFilters {
  category?: string;
  limit?: number;
  offset?: number;
}

export interface ProductPage {
  data: Product[];
  total: number;
  limit: number;
  offset: number;
}

// Supabase service interface
export interface SupabaseService {
  getProducts(filters?: ProductFilters): Promise<ProductPage>;
  getProductById(id: string): Promise<Product>;
  getCategories(): Promise<string[]>;
}

// TanStack Query hook return types
export interface UseProductsResult {
  data: ProductPage | undefined;
  error: Error | null;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  refetch: () => Promise<void>;
}
```

## Testing Strategy

| Layer | What to Test | Approach |
|-------|-------------|----------|
| Unit | ProductCard component rendering with different props | Render with React Native Testing Library, assert visual output matches props |
| Unit | CategoryFilter component state changes | Simulate user interactions, verify filter updates |
| Unit | Supabase service methods | Mock Supabase client, verify correct API calls and data transformation |
| Unit | Custom hooks (useProducts, useCategories) | Mock useQuery, verify loading/error/data states |
| Integration | ProductListScreen data fetching and rendering | Mock Supabase service, verify loading states and data display |
| Integration | Navigation between screens | Verify navigation actions and parameter passing |
| E2E | Complete user flow: browse products → filter → view detail | Use Detox to test on iOS/Android emulators/simulators |

## Migration / Rollout

No migration required as this is a new feature. Rollback plan:
1. Git revert to commit before feature implementation
2. Remove any new dependencies if needed (though none are anticipated)
3. Backup current codebase before starting (already done via version control)

## Open Questions

- [ ] Should we implement optimistic updates for future mutable operations (like adding to cart)?
- [ ] What should be the default page size for product listing - 10, 20, or 50 items?
- [ ] Should we implement server-side pagination or client-side filtering for large datasets?
- [ ] Should we handle product images - direct URLs from Supabase storage or through a CDN?
- [ ] Should we add search functionality in addition to category filtering in a future iteration?

## Implementation Approach

1. **Setup Phase**: Create directory structure, extend theme, set up Supabase service
2. **Data Layer**: Implement Supabase service methods for product data access
3. **Hooks Layer**: Create custom hooks for data fetching with TanStack Query
4. **UI Components**: Build reusable components (ProductCard, CategoryFilter) with Styled Components
5. **Screens**: Implement ProductListScreen and ProductDetailScreen with navigation
6. **Integration**: Connect screens to data hooks and navigation
7. **Styling**: Apply responsive design principles and theme usage
8. **Testing**: Write unit and integration tests for critical paths
9. **Validation**: Test on iOS/Android devices, verify loading/error states, performance

This approach follows the principles outlined in the proposal and satisfies all requirements in the specification while maintaining clean separation of concerns and leveraging the chosen technologies effectively.