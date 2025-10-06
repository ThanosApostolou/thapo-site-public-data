package thapo.pocspring.infrastructure.rest;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.web.SecurityFilterChain;

import java.util.Collection;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig {
    static class CustomAuthenticationToken extends AbstractAuthenticationToken {

        /**
         * Creates a token with the supplied array of authorities.
         *
         * @param authorities the collection of <tt>GrantedAuthority</tt>s for the principal
         *                    represented by this authentication object.
         */
        public CustomAuthenticationToken(Collection<? extends GrantedAuthority> authorities) {
            super(authorities);
        }

        @Override
        public Object getCredentials() {
            return null;
        }

        @Override
        public Object getPrincipal() {
            return null;
        }
    }

//    static class CustomAuthenticationConverter implements Converter<OAuth2ResourceServerProperties.Jwt, AbstractAuthenticationToken> {
//        public AbstractAuthenticationToken convert(OAuth2ResourceServerProperties.Jwt jwt) {
//            return new CustomAuthenticationToken(jwt.auth);
//        }
//    }

    @Bean
    public SecurityFilterChain filterChain(final HttpSecurity http) throws Exception {
        http
                .cors(Customizer.withDefaults())
                .csrf(Customizer.withDefaults())
                .authorizeHttpRequests((authorizationManagerRequestMatcherRegistry) -> {
                    authorizationManagerRequestMatcherRegistry.requestMatchers("/actuator/**").permitAll();
                    authorizationManagerRequestMatcherRegistry.requestMatchers("/public_api/**").permitAll();
                    authorizationManagerRequestMatcherRegistry.requestMatchers("/api/**").authenticated();
                    authorizationManagerRequestMatcherRegistry.anyRequest().denyAll();
                })
                .sessionManagement(securitySessionManagementConfigurer ->
                        securitySessionManagementConfigurer.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .oauth2ResourceServer((httpSecurityOAuth2ResourceServerConfigurer) ->
                        httpSecurityOAuth2ResourceServerConfigurer.jwt(Customizer.withDefaults()));
        return http.build();
    }
}
