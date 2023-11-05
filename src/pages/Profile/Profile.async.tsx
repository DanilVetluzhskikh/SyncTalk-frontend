import React from 'react';

const ProfileAsync = React.lazy(() => import('./Profile'));

export { ProfileAsync as Profile };
