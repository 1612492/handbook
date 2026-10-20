# Spec Delta

## Purpose

Lets users discover and open the available interview-topic visualizers from a single index, so each topic is reachable by a stable route and new topics can be added without changing navigation.

## ADDED Requirements

### Requirement: Topic catalog lists available topics

The system SHALL display a catalog of available interview topics, each showing at least its title and a short description.

#### Scenario: Catalog renders topics

- **WHEN** a user navigates to the topics index route
- **THEN** the system displays every registered topic with its title and description

#### Scenario: Empty catalog

- **WHEN** no topics are registered
- **THEN** the system displays an empty-state message instead of a blank list

### Requirement: Topic catalog entries are navigable

The system SHALL provide a navigation affordance for each catalog entry that routes to that topic's dedicated page.

#### Scenario: Open a topic

- **WHEN** a user activates a topic's entry
- **THEN** the system navigates to that topic's route

### Requirement: Unknown topic yields not-found

The system SHALL present a not-found state when a topic identifier does not match any registered topic.

#### Scenario: Unknown topic id

- **WHEN** a user navigates to a topic route whose identifier is not registered
- **THEN** the system displays a not-found state and does not render a visualizer

### Requirement: Topic metadata is stable

Each registered topic SHALL expose a unique identifier, a title, and a description that the catalog and route use consistently.

#### Scenario: Consistent metadata

- **WHEN** a topic is shown in the catalog and on its own page
- **THEN** both surfaces display the same title and description for that topic identifier
