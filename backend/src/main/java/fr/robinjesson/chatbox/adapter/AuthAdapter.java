package fr.robinjesson.chatbox.adapter;

import fr.robinjesson.chatbox.api.request.LoginRequest;
import fr.robinjesson.chatbox.business.AuthBusiness;
import fr.robinjesson.chatbox.business.JwtBusiness;
import fr.robinjesson.chatbox.entities.UserEntity;
import fr.robinjesson.chatbox.security.Consts;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.server.Cookie;
import org.springframework.http.ResponseCookie;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthAdapter {
    private final AuthBusiness authBusiness;
    private final JwtBusiness jwtBusiness;

    @Value("${security.jwt.expiration-time}")
    private long jwtExpiration;

    @Value("${security.jwt.cookie-secure}")
    private boolean cookieSecure;

    public ResponseCookie authenticate(final LoginRequest loginRequest) {
        final UserEntity user = authBusiness.authenticate(loginRequest.uid(), loginRequest.password());
        final String token = jwtBusiness.generateToken(user);
        return ResponseCookie.from(Consts.COOKIE_NAME, token)
                .httpOnly(true)
                .path("/")
                .secure(cookieSecure)
                .sameSite(Cookie.SameSite.LAX.attributeValue())
                .maxAge(jwtExpiration / 1000)
                .build();
    }

    public ResponseCookie logout() {
        return ResponseCookie.from(Consts.COOKIE_NAME, "")
                .httpOnly(true)
                .path("/")
                .secure(cookieSecure)
                .sameSite(Cookie.SameSite.LAX.attributeValue())
                .maxAge(0)
                .build();
    }
}
