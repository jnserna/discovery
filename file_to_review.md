src/index.css


@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 40 30% 97%;
    --foreground: 200 25% 15%;

    --card: 40 25% 95%;
    --card-foreground: 200 25% 15%;

    --popover: 40 30% 97%;
    --popover-foreground: 200 25% 15%;

    --primary: 160 30% 40%;
    --primary-foreground: 40 30% 97%;

    --secondary: 30 30% 90%;
    --secondary-foreground: 200 25% 20%;

    --muted: 40 15% 92%;
    --muted-foreground: 200 10% 45%;

    --accent: 200 35% 85%;
    --accent-foreground: 200 30% 20%;

    --destructive: 0 65% 55%;
    --destructive-foreground: 0 0% 100%;

    --border: 40 15% 88%;
    --input: 40 15% 88%;
    --ring: 160 30% 40%;

    --radius: 0.75rem;

    --sage: 160 30% 40%;
    --sage-light: 160 25% 92%;
    --warm: 30 40% 92%;
    --warm-dark: 30 25% 50%;
    --sky: 200 35% 85%;
    --sky-dark: 200 30% 45%;
    --lavender: 270 25% 90%;
    --lavender-dark: 270 20% 50%;

    --sidebar-background: 40 25% 95%;
    --sidebar-foreground: 200 25% 20%;
    --sidebar-primary: 160 30% 40%;
    --sidebar-primary-foreground: 40 30% 97%;
    --sidebar-accent: 160 25% 92%;
    --sidebar-accent-foreground: 200 25% 20%;
    --sidebar-border: 40 15% 88%;
    --sidebar-ring: 160 30% 40%;
  }

  .dark {
    --background: 200 20% 10%;
    --foreground: 40 20% 92%;

    --card: 200 18% 14%;
    --card-foreground: 40 20% 92%;

    --popover: 200 20% 10%;
    --popover-foreground: 40 20% 92%;

    --primary: 160 35% 50%;
    --primary-foreground: 200 20% 10%;

    --secondary: 200 15% 20%;
    --secondary-foreground: 40 20% 90%;

    --muted: 200 15% 18%;
    --muted-foreground: 40 10% 60%;

    --accent: 200 20% 25%;
    --accent-foreground: 40 20% 90%;

    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 0 0% 100%;

    --border: 200 15% 20%;
    --input: 200 15% 20%;
    --ring: 160 35% 50%;

    --sage: 160 35% 50%;
    --sage-light: 160 20% 18%;
    --warm: 30 20% 18%;
    --warm-dark: 30 30% 60%;
    --sky: 200 20% 25%;
    --sky-dark: 200 35% 60%;
    --lavender: 270 15% 20%;
    --lavender-dark: 270 25% 60%;

    --sidebar-background: 200 18% 12%;
    --sidebar-foreground: 40 20% 90%;
    --sidebar-primary: 160 35% 50%;
    --sidebar-primary-foreground: 200 20% 10%;
    --sidebar-accent: 200 15% 18%;
    --sidebar-accent-foreground: 40 20% 90%;
    --sidebar-border: 200 15% 20%;
    --sidebar-ring: 160 35% 50%;
  }
}

@layer base {
  * {
    @apply border-border;
  }

  body {
    @apply bg-background text-foreground font-body antialiased;
  }

  h1, h2, h3, h4, h5, h6 {
    @apply font-display;
  }
}

@layer utilities {
  .gradient-sage {
    background: linear-gradient(135deg, hsl(var(--sage-light)), hsl(var(--accent)));
  }
  .gradient-warm {
    background: linear-gradient(135deg, hsl(var(--warm)), hsl(var(--secondary)));
  }
  .gradient-hero {
    background: linear-gradient(160deg, hsl(var(--sage-light)), hsl(var(--background)), hsl(var(--warm)));
  }
  .text-gradient-sage {
    background: linear-gradient(135deg, hsl(var(--sage)), hsl(var(--sky-dark)));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
}











src/App.css

#root {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
}

.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.react:hover {
  filter: drop-shadow(0 0 2em #61dafbaa);
}

@keyframes logo-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@media (prefers-reduced-motion: no-preference) {
  a:nth-of-type(2) .logo {
    animation: logo-spin infinite 20s linear;
  }
}

.card {
  padding: 2em;
}

.read-the-docs {
  color: #888;
}











src/components/ui/card.tsx


import * as React from "react";

import { cn } from "@/lib/utils";

const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("rounded-lg border bg-card text-card-foreground shadow-sm", className)} {...props} />
));
Card.displayName = "Card";

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />
  ),
);
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3 ref={ref} className={cn("text-2xl font-semibold leading-none tracking-tight", className)} {...props} />
  ),
);
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props} />
  ),
);
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />,
);
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex items-center p-6 pt-0", className)} {...props} />
  ),
);
CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };
