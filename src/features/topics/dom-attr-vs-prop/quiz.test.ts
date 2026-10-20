import { describeQuizBehaviour } from "../shared/quiz-helpers";
import { examples } from "./examples";
import { ALL_CONTAINERS } from "./model";
import { getNextDestination } from "./quiz";

describeQuizBehaviour(examples, ALL_CONTAINERS, getNextDestination);
