# prototypes-visualization Specification

## Purpose

Lets a user watch how JavaScript resolves properties through the prototype chain, step by step, making `[[Prototype]]` lookup, constructor/prototype linkage, and `Object.create` delegation observable.

## Requirements

### Requirement: Visualizer renders chain containers

The system SHALL render labeled containers representing the prototype chain for the active example: instance, own prototype, `Object.prototype`, and end of chain.

#### Scenario: Containers present

- **WHEN** a prototypes example is loaded
- **THEN** the system displays all four chain containers with their current contents

### Requirement: Step navigation controls

The system SHALL provide controls to move to the previous step, next step, and reset to the initial step.

#### Scenario: Step forward

- **WHEN** the user activates the next-step control and a next step exists
- **THEN** the system advances to that step and updates the chain

#### Scenario: Step backward

- **WHEN** the user activates the previous-step control and a previous step exists
- **THEN** the system returns to that step and restores the chain

#### Scenario: Reset

- **WHEN** the user activates the reset control
- **THEN** the system returns to the initial step with no resolved property

### Requirement: Auto-play advances steps

The system SHALL advance through steps automatically when play is active, at a speed chosen by the user from the provided options.

#### Scenario: Play

- **WHEN** the user activates play
- **THEN** the system advances one step at a time at the selected speed until paused or the final step

#### Scenario: Pause

- **WHEN** the user activates pause while playing
- **THEN** the system stops advancing and retains the current step

### Requirement: Scrubber seeks to a step

The system SHALL allow the user to jump directly to any step via a scrubber control.

#### Scenario: Seek

- **WHEN** the user selects a step position on the scrubber
- **THEN** the system displays that step's state without auto-advancing

### Requirement: Code highlight tracks the active step

The system SHALL highlight the source line associated with the active step within the example's code.

#### Scenario: Highlight moves

- **WHEN** the active step changes
- **THEN** the highlighted line in the code view updates to that step's associated line

### Requirement: Narration explains the active step

The system SHALL display a textual explanation of why the active step occurs, referencing the applicable prototype-chain rule when applicable.

#### Scenario: Narration shown

- **WHEN** a step becomes active
- **THEN** the system displays that step's explanation text

### Requirement: Output log records resolved properties

The system SHALL maintain an output log listing resolved property values in the order they are produced by the example.

#### Scenario: Output appended

- **WHEN** an active step resolves a property
- **THEN** that value is appended to the output log in production order

### Requirement: Example selection

The system SHALL let the user choose among the curated prototypes examples, and switching examples SHALL reset playback to the initial step.

#### Scenario: Switch example

- **WHEN** the user selects a different example
- **THEN** the system loads that example and resets to its initial step

### Requirement: Reduced motion is respected

The system SHALL disable non-essential movement when the user's environment requests reduced motion, while preserving step navigation and state changes.

#### Scenario: Reduced motion enabled

- **WHEN** reduced motion is requested by the environment
- **THEN** the system presents state changes without animated movement

### Requirement: Predict-next quiz mode

The system SHALL offer a mode that hides the next step and asks the user to predict which chain link resolves the next property, revealing the answer on response.

#### Scenario: Correct prediction

- **WHEN** the user predicts the chain link and it matches the next step
- **THEN** the system reveals the step and indicates the prediction was correct

#### Scenario: Incorrect prediction

- **WHEN** the user predicts the chain link and it does not match the next step
- **THEN** the system reveals the step and indicates the prediction was incorrect
