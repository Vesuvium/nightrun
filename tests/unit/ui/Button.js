import test from 'ava';
import td from 'testdouble';

import Button from '../../../src/ui/Button';
import Text from '../../../src/ui/Text';


test('the Button class', (ava) => {
    ava.true(Button.prototype instanceof Text);
});