import React from 'react';
import { render } from 'react-dom';

// Ensures that Grommet styles are applied to the entire app
import 'styles/grommet.scss';

import AppConfig from './AppConfig.jsx';

const element = document.getElementById('app');
render(<AppConfig />, element);
