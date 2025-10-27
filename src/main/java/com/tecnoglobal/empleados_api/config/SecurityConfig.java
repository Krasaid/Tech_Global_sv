package com.tecnoglobal.empleados_api.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
    // ...
    @Bean
    public UserDetailsService userDetailsService() {
        // --- Usamos {noop} para decirle que es texto plano (solo para labs) ---
        UserDetails user = User.withUsername("admin@tecnoglobal.com")
                .password("{noop}1234") // <-- FÍJATE EN EL {noop}
                .roles("USER", "ADMIN")
                .build();

        return new InMemoryUserDetailsManager(user);
    }
// ...

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                // 1. Deshabilitar CSRF. Es necesario para que 'fetch' funcione desde JS
                // (En producción se usa un token, pero para un lab está bien)
                .csrf(AbstractHttpConfigurer::disable)

                .authorizeHttpRequests(auth -> auth
                        // 2. Permitimos acceso público a la página de login y su JS
                        .requestMatchers("/login.html", "/login.js").permitAll()
                        // 3. Proteger todo lo demás (nuestro index.html y la API)
                        .anyRequest().authenticated()
                )
                .formLogin(form -> form
                        // 4. Le decimos a Spring cuál es nuestra página de login
                        .loginPage("/login.html")
                        // 5. Le decimos qué URL debe procesar (la que usa nuestro 'fetch')
                        .loginProcessingUrl("/login")

                        // 6. Qué hacer si el login AJAX es exitoso
                        .successHandler((req, res, auth) -> {
                            res.setStatus(200); // Devuelve 200 OK (nuestro JS se encarga de redirigir)
                        })
                        // 7. Qué hacer si el login AJAX falla
                        .failureHandler((req, res, ex) -> {
                            res.setStatus(401); // Devuelve 401 Unauthorized (nuestro JS muestra el error)
                        })
                );

        return http.build();
    }
}
