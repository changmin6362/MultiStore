package io.github.changmin6362.multistore.feature.authentication.service;

import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Date;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class RefreshTokenService {

    private final Map<String, RefreshTokenRecord> store = new ConcurrentHashMap<>();
    private final long ttlSeconds = 60L * 60L * 24L * 7L; // 7일

    public String createToken(String subject) {
        String token = UUID.randomUUID().toString() + UUID.randomUUID();
        Date expiry = Date.from(Instant.now().plusSeconds(ttlSeconds));
        store.put(token, new RefreshTokenRecord(subject, expiry));
        return token;
    }

    public boolean isValid(String token) {
        RefreshTokenRecord record = store.get(token);
        if (record == null || record.expiresAt().before(new Date())) {
            if (record != null) store.remove(token);
            return false;
        }
        return true;
    }

    public String getSubject(String token) {
        RefreshTokenRecord record = store.get(token);
        return record == null ? null : record.subject();
    }

    public void remove(String token) {
        store.remove(token);
    }

    private record RefreshTokenRecord(String subject, Date expiresAt) {}
}
