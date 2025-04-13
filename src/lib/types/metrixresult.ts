export type DiscgolfMetrixResult = {
  Competition: Competition;
  Errors: unknown[];
};

export type Competition = {
  ID: number;
  Name: string;
  Type: string;
  TourDateStart: Date;
  TourDateEnd: Date;
  Date: Date;
  Time: string;
  Comment: string;
  CourseName: string;
  CourseID: string;
  MetrixMode: string;
  ShowPreviousRoundsSum: null;
  HasSubcompetitions: number;
  WeeklyHCSummary: null;
  WeeklyHC: unknown[];
  Results: unknown[];
  Tracks: Track[];
  ShowTourView: number;
  SubCompetitions: SubCompetition[];
};

export type SubCompetition = {
  ID: string;
  Name: string;
  Type: string;
  TourDateStart: Date | null;
  TourDateEnd: Date | null;
  Date: Date;
  Time: string;
  Comment: string;
  CourseName: string;
  CourseID: string;
  MetrixMode: string;
  ShowPreviousRoundsSum: null | string;
  HasSubcompetitions: number;
  WeeklyHCSummary: null;
  WeeklyHC: unknown[];
  Results: Result[];
  Tracks: Track[];
};

export type Result = {
  UserID: string;
  ScorecardID: string;
  Name: string;
  ClassName: string;
  CountryCode: string;
  Group: string;
  PlayerResults: Array<unknown[] | PlayerResultClass>;
  Penalty: null;
  Sum: number;
  Diff: number;
  DNF: null;
  BUETotal: string;
  GRHTotal: string;
  OCPTotal: string;
  ICPTotal: string;
  IBPTotal: string;
  PenaltiesTotal: string;
  PreviousRoundsSum: null;
  PreviousRoundsDiff: null;
  Place: number;
  OrderNumber: number;
};

export type PlayerResultClass = {
  Result: string;
  Diff: number;
  BUE: string;
  GRH: string;
  OCP: string;
  ICP: string;
  IBP: string;
  PEN: string;
};

export type Track = {
  Number: string;
  NumberAlt: string;
  Par: string;
};
