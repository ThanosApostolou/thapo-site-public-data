package javaconc;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.util.HexFormat;

public class Utils {
    private final static HexFormat hexFormat = HexFormat.of();

    public static String hash(final MessageDigest messageDigest, final String message) {
        byte[] encodedhash = messageDigest.digest(message.getBytes(StandardCharsets.UTF_8));
        return hexFormat.formatHex(encodedhash);

    }
}
