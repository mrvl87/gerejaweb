import { makePage } from '@keystatic/astro/ui';
import keystaticConfig from 'virtual:keystatic-config';

const KeystaticPage = makePage(keystaticConfig);

export default KeystaticPage;
