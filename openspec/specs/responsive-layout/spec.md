# responsive-layout Specification

## Purpose

Keeps the handbook usable on small screens by adapting navigation, controls, and content layout without losing access to any topic or feature.

## Requirements

### Requirement: Topic navigation is available on small screens

The system SHALL provide a control on small screens that opens a drawer containing the full topic navigation.

#### Scenario: Opening mobile navigation

- **WHEN** a user on a small screen activates the topics control
- **THEN** a drawer opens showing every registered topic grouped by category

#### Scenario: Navigating from the drawer

- **WHEN** a user selects a topic in the mobile drawer
- **THEN** the app navigates to that topic and the drawer closes

### Requirement: Desktop sidebar remains visible

The system SHALL display the topic sidebar inline on sufficiently wide screens.

#### Scenario: Wide viewport

- **WHEN** the app is viewed on a wide screen
- **THEN** the topic sidebar is visible alongside the main content

### Requirement: Code blocks scroll horizontally

The system SHALL allow code blocks wider than the viewport to scroll horizontally instead of clipping or breaking layout.

#### Scenario: Long code line on a phone

- **WHEN** a code block contains a line wider than the available width
- **THEN** the user can scroll the code block horizontally to read it

### Requirement: No unintended horizontal page scroll

The system SHALL avoid horizontal scrolling of the page itself on small screens.

#### Scenario: Narrow viewport browsing

- **WHEN** a user browses any route on a phone-width viewport
- **THEN** the page does not require horizontal scrolling except within code blocks

### Requirement: Visualizer controls remain usable on small screens

The system SHALL keep playback controls operable and visible on small screens.

#### Scenario: Controls on a phone

- **WHEN** a user views a visualizer on a phone-width viewport
- **THEN** playback controls are visible and can be activated without horizontal scrolling
