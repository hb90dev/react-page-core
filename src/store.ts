/*
 * This file is part of ORY Editor.
 *
 * ORY Editor is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * ORY Editor is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with ORY Editor.  If not, see <http://www.gnu.org/licenses/>.
 *
 * @license LGPL-3.0
 * @copyright 2016-2018 Aeneas Rekkas
 * @author Aeneas Rekkas <aeneas+oss@aeneas.io>
 *
 */

import { createStore, applyMiddleware, compose, Store } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducer';
import { RootState } from './types/state';
import { isProduction } from './const';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: (settings: unknown) => void;
  }
}

/**
 * Returns a new redux store.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default (initialState: any, middleware: [] = []): Store<RootState> => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const v: any =
    !isProduction &&
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
      : compose;

  return createStore(
    rootReducer,
    initialState,
    v(applyMiddleware(...middleware, thunk))
  );
};
