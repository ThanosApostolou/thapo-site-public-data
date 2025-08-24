package javaconc;

import org.junit.jupiter.api.Test;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

import static org.junit.jupiter.api.Assertions.assertEquals;

class UtilsTest {

    @Test
    void hashTest() throws NoSuchAlgorithmException {
        final MessageDigest messageDigest = MessageDigest.getInstance("SHA-256");
        assertEquals("128c620a947710b7573aeda4eef01ce17f6af30abcfa9595457adf2d03b6cc79", Utils.hash(messageDigest, "1d2c4444-0931-43cb-b25e-8d197764924b"));
    }
}