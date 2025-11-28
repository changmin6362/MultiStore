package io.github.changmin6362.multistore.feature.authentication.service;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;

@Component
public class JwtTokenProvider {

    private final SecretKey secretKey;
    private final long accessTokenTtlSeconds;

    public JwtTokenProvider(
            @Value("${jwt.secret:dev-secret-change-me-dev-secret-change-me}") String jwtSecret,
            @Value("${jwt.accessTokenTtlSeconds:3600}") long accessTokenTtlSeconds
    ) {
        byte[] keyBytes = jwtSecret.length() >= 32
                ? jwtSecret.getBytes(StandardCharsets.UTF_8)
                : (jwtSecret + "_padding_to_32_bytes________________________________").substring(0, 32).getBytes(StandardCharsets.UTF_8);
        this.secretKey = Keys.hmacShaKeyFor(keyBytes);
        this.accessTokenTtlSeconds = accessTokenTtlSeconds;
    }

    public String createToken(String subject, String email, String nickName) {
        Date now = new Date();
        Date expiry = new Date(now.getTime() + accessTokenTtlSeconds * 1000);
        return Jwts.builder()
                .setSubject(subject)
                .setIssuedAt(now)
                .setExpiration(expiry)
                .claim("email", email)
                .claim("nickName", nickName)
                .signWith(secretKey, SignatureAlgorithm.HS256)
                .compact();
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder().setSigningKey(secretKey).build().parseClaimsJws(token);
            return true;
        } catch (JwtException e) {
            return false;
        }
    }

    public String getSubject(String token) {
        return Jwts.parserBuilder().setSigningKey(secretKey).build()
                .parseClaimsJws(token).getBody().getSubject();
    }

    public Date getExpiration(String token) {
        return Jwts.parserBuilder().setSigningKey(secretKey).build()
                .parseClaimsJws(token).getBody().getExpiration();
    }
}
