package thapo.pocspring.infrastructure.auth;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class WebSecurityConfig {
    @Value("${spring.security.oauth2.resourceserver.opaquetoken.introspection-uri}")
    private String introspectionUri;
    @Value("${spring.security.oauth2.resourceserver.opaquetoken.client-id}")
    private String clientId;
    @Value("${spring.security.oauth2.resourceserver.opaquetoken.client-secret}")
    private String clientSecret;

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
                        httpSecurityOAuth2ResourceServerConfigurer.opaqueToken(opaqueTokenConfigurer -> {
                            opaqueTokenConfigurer.introspector(new CustomOpaqueTokenIntrospector(introspectionUri, clientId, clientSecret));
                        }));
        return http.build();
    }
}
