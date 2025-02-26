"use client";
import React, { FC, ReactNode } from "react";
import { ThemeProvider } from "@/components/theme-provider";
import client from "@/lib/apollo-client";
import { ApolloProvider } from "@apollo/client";

const ContextProviders: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
    </ApolloProvider>
  );
};

export default ContextProviders;
