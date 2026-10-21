# theme-switching Specification

## Purpose

Lets users choose and persist a visual theme (light, dark, or system) across the handbook so the interface and visualizers remain readable in their preferred color scheme.

## Requirements

### Requirement: Theme preference can be selected

The system SHALL allow the user to choose between light, dark, and system themes from the app shell.

#### Scenario: Selecting a theme

- **WHEN** the user selects a theme option
- **THEN** the app applies that theme immediately and persists the choice

#### Scenario: Restoring a saved preference

- **WHEN** the user reloads the app after choosing a theme
- **THEN** the app uses the saved theme without requiring another selection

### Requirement: System theme is the default

The system SHALL follow the operating system color scheme when no explicit theme preference is stored.

#### Scenario: First visit on a dark-mode OS

- **WHEN** a user with no stored preference opens the app on an OS configured for dark mode
- **THEN** the app renders in dark mode

#### Scenario: First visit on a light-mode OS

- **WHEN** a user with no stored preference opens the app on an OS configured for light mode
- **THEN** the app renders in light mode

### Requirement: No flash of incorrect theme

The system SHALL render the initial view in the resolved theme before first paint.

#### Scenario: Stored dark preference on load

- **WHEN** a user with a stored dark preference loads the app
- **THEN** the first painted view is dark and does not flash light

### Requirement: Theme applies to all surfaces

The system SHALL apply the selected theme to all UI, including code blocks, visualizer stages, and toasts.

#### Scenario: Switching themes updates code view

- **WHEN** the user switches from light to dark
- **THEN** the code block and highlighted lines update to the dark presentation

#### Scenario: Toasts follow theme

- **WHEN** a toast is displayed in dark mode
- **THEN** the toast uses dark styling

### Requirement: Theme toggle is accessible

The system SHALL expose the theme toggle as an accessible control with a discernible name.

#### Scenario: Keyboard operation

- **WHEN** a keyboard user focuses the theme toggle
- **THEN** they can open and choose an option using the keyboard

#### Scenario: Screen reader announcement

- **WHEN** assistive technology encounters the theme toggle
- **THEN** it announces the control and its current value
