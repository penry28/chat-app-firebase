import { attach } from './store';
import App from './App';

import './icons';
import './styles/index.scss';
import 'jquery';
import 'bootstrap';

attach(App, document.getElementById('root'));
