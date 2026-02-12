package com.example.Spring.Security.JWT.Config;

import com.example.Spring.Security.JWT.Service.JwtService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.web.servlet.HandlerExceptionResolver;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class JwtAuthFilter extends OncePerRequestFilter {

    private final HandlerExceptionResolver handlerExceptionResolver;
    private final JwtService jwtService;
    private final UserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(
            @NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain
    ) throws ServletException, IOException {

        String path = request.getServletPath();

        if (
                path.startsWith("/notes/shared/") ||
                        path.startsWith("/auth/") ||
                        path.equals("/") ||
                        path.equals("/index.html") ||
                        path.startsWith("/assets/") ||
                        path.equals("/favicon.ico") ||
                        path.equals("/login") ||
                        path.equals("/signup") ||
                        path.equals("/verify") ||
                        path.startsWith("/v3/api-docs") ||
                        path.startsWith("/swagger-ui")
        ) {
            filterChain.doFilter(request, response);
            return;
        }


        final String authorizationHeader = request.getHeader("Authorization");

        if (authorizationHeader == null || !authorizationHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        try {
            final String token = authorizationHeader.substring(7);
            final String userEmail = jwtService.extractUserName(token);

            Authentication authentication = SecurityContextHolder
                    .getContext()
                    .getAuthentication();

            if (userEmail != null && authentication == null) {

                UserDetails userDetails =
                        userDetailsService.loadUserByUsername(userEmail);

                if (jwtService.isTokenValid(token, userDetails)) {

                    UsernamePasswordAuthenticationToken authToken =
                            new UsernamePasswordAuthenticationToken(
                                    userDetails,
                                    null,
                                    userDetails.getAuthorities()
                            );

                    authToken.setDetails(
                            new WebAuthenticationDetailsSource()
                                    .buildDetails(request)
                    );

                    SecurityContextHolder.getContext()
                            .setAuthentication(authToken);
                }
            }

            filterChain.doFilter(request, response);

        } catch (Exception e) {
            logger.error("JWT auth failed", e);
            handlerExceptionResolver.resolveException(request, response, null, e);
        }
    }
}
