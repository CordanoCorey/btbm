import { build, Token } from '@caiu/library';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, distinctUntilChanged, take } from 'rxjs/operators';

import { CurrentUser } from './models';

export function userSelector(store: Store<any>): Observable<CurrentUser> {
  return store.select('currentUser').pipe(map(user => build(CurrentUser, user)));
}

export function userIdSelector(store: Store<any>): Observable<number> {
  return userSelector(store).pipe(
    map(x => x.id),
    distinctUntilChanged()
  );
}

export function userNameSelector(store: Store<any>): Observable<string> {
  return userSelector(store).pipe(
    map(x => x.fullName),
    distinctUntilChanged()
  );
}

export function authenticatedSelector(store: Store<any>): Observable<boolean> {
  return userSelector(store).pipe(
    map(user => user.authenticated),
    take(1)
  );
}

export function authTokenSelector(store: Store<any>): Observable<string> {
  return userSelector(store).pipe(
    map(user => {
      const token: Token = user && user.token ? build(Token, user.token) : new Token();
      return token.toString();
    })
  );
}
