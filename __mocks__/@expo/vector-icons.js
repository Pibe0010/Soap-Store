import React from 'react';

const createMockIcon = (name) => {
  const MockIcon = (props) => React.createElement('Icon', { name, ...props });
  MockIcon.displayName = name;
  return MockIcon;
};

const Ionicons = createMockIcon('Ionicons');
Ionicons.displayName = 'Ionicons';

export { Ionicons };
export default { Ionicons };
