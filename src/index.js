import Nav from './components/Nav/Nav';
import { Favourite } from './components/Favourite/Favourite';
import { Posts } from './components/Posts/Posts';
import { Create } from './components/Create/Create';
import './index.scss';
import { Loader } from './components/Loader/Loader';

const nav = new Nav('navigation');
const loader = new Loader('loader');

const favourite = new Favourite('favourite');
const posts = new Posts('posts', { loader });
const create = new Create('create');


nav.registerTabs([
  { name: 'create', component: create },
  { name: 'favourite', component: favourite },
  { name: 'posts', component: posts }
]);
