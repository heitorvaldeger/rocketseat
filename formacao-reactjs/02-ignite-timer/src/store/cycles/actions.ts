import { Cycle } from "@/models/cycle";

export enum ActionsEnum {
  ADD_NEW_CYCLE = "ADD_NEW_CYCLE",
  INTERRUPT_CURRENT_CYCLE = "INTERRUPT_CURRENT_CYCLE",
  MARK_CURRENT_CYCLE_AS_FINISHED = "MARK_CURRENT_CYCLE_AS_FINISHED",
}

export const addNewCycleAction = (newCycle: Cycle) => ({
  type: ActionsEnum.ADD_NEW_CYCLE,
  payload: {
    newCycle,
  },
});

export const interruptCycleAction = () => ({
  type: ActionsEnum.INTERRUPT_CURRENT_CYCLE,
});

export const markCurrentCycleAsFinishedAction = () => ({
  type: ActionsEnum.MARK_CURRENT_CYCLE_AS_FINISHED,
});
