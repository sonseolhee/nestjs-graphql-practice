import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async getAccessToken({ user }) {
    return this.jwtService.sign(
      { email: user.email, sub: user.id, role: user.role },
      { secret: 'jwt-access-token-key', expiresIn: '1h' },
    );
  }

  async setRefreshToken({ user, res }) {
    const refreshToken = this.jwtService.sign(
      { email: user.email, sub: user.id, role: user.role },
      { secret: 'jwt-refresh-token-key', expiresIn: '2w' },
    );

    res.setHeader('Set-Cookie', `refreshToken=${refreshToken}; path=/;`);
    console.log(res);
  }
}
