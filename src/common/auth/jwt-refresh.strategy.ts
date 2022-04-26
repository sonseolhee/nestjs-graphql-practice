import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';

export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'refresh') {
  constructor() {
    super({
      jwtFromRequest: (req: { headers: { cookie: any } }) => {
        const cookie = req.headers.cookie;
        return cookie.replace('refreshToken=', '');
      },
      secretOrKey: 'jwt-refresh-token-key',
      ignoreExpiration: false,
    });
  }

  validate(payload: any) {
    return {
      id: payload.sub,
      email: payload.email,
      role: payload.role,
    };
  }
}
