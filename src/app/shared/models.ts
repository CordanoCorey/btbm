import { Metadata, build, Validators, BaseEntity, Collection, CurrentUser as BaseCurrentUser } from '@caiu/library';

export { BaseEntity } from '@caiu/library';

export class Login {
  email = '';
  password = '';

  get metadata(): Metadata {
    return build(Metadata, {
      email: {
        validators: [Validators.required, Validators.email]
      }
    });
  }
}

export class CurrentUser extends BaseCurrentUser {
  static Build(data: any): CurrentUser {
    return build(CurrentUser, BaseCurrentUser.Build(data));
  }

  get metadata(): Metadata {
    return build(Metadata, {
      ignore: ['id', 'expiresInDate', 'password', 'passwordResetCode', 'role', 'token']
    });
  }
}
