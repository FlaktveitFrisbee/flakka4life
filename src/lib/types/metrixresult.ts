// To parse this data:
//
//   import { Convert, DiscgolfMetrixResult } from "./file";
//
//   const discgolfMetrixResult = Convert.toDiscgolfMetrixResult(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.

export type DiscgolfMetrixResult = {
  competition: Competition
  errors: any[]
}

export type Competition = {
  id: number
  name: string
  type: string
  tourDateStart: Date
  tourDateEnd: Date
  date: Date
  time: string
  comment: string
  courseName: string
  courseID: string
  metrixMode: string
  showPreviousRoundsSum: null
  hasSubcompetitions: number
  weeklyHCSummary: null
  weeklyHC: any[]
  results: any[]
  tracks: Track[]
  showTourView: number
  subCompetitions: SubCompetition[]
}

export type SubCompetition = {
  id: string
  name: string
  type: string
  tourDateStart: Date | null
  tourDateEnd: Date | null
  date: Date
  time: string
  comment: string
  courseName: string
  courseID: string
  metrixMode: string
  showPreviousRoundsSum: null | string
  hasSubcompetitions: number
  weeklyHCSummary: null
  weeklyHC: any[]
  results: Result[]
  tracks: Track[]
}

export type Result = {
  userID: string
  scorecardID: string
  name: string
  className: string
  countryCode: string
  group: string
  playerResults: Array<any[] | PlayerResultClass>
  penalty: null
  sum: number
  diff: number
  dnf: null
  bueTotal: string
  grhTotal: string
  ocpTotal: string
  icpTotal: string
  ibpTotal: string
  penaltiesTotal: string
  previousRoundsSum: null
  previousRoundsDiff: null
  place: number
  orderNumber: number
}

export type PlayerResultClass = {
  result: string
  diff: number
  bue: string
  grh: string
  ocp: string
  icp: string
  ibp: string
  pen: string
}

export type Track = {
  number: string
  numberAlt: string
  par: string
}

// Converts JSON strings to/from your types
// and asserts the results of JSON.parse at runtime
export class Convert {
  public static toDiscgolfMetrixResult(json: string): DiscgolfMetrixResult {
    return cast(JSON.parse(json), r('DiscgolfMetrixResult'))
  }

  public static discgolfMetrixResultToJson(
    value: DiscgolfMetrixResult,
  ): string {
    return JSON.stringify(uncast(value, r('DiscgolfMetrixResult')), null, 2)
  }
}

function invalidValue(typ: any, val: any, key: any, parent: any = ''): never {
  const prettyTyp = prettyTypeName(typ)
  const parentText = parent ? ` on ${parent}` : ''
  const keyText = key ? ` for key "${key}"` : ''
  throw Error(
    `Invalid value${keyText}${parentText}. Expected ${prettyTyp} but got ${JSON.stringify(val)}`,
  )
}

function prettyTypeName(typ: any): string {
  if (Array.isArray(typ)) {
    if (typ.length === 2 && typ[0] === undefined) {
      return `an optional ${prettyTypeName(typ[1])}`
    } else {
      return `one of [${typ
        .map((a) => {
          return prettyTypeName(a)
        })
        .join(', ')}]`
    }
  } else if (typeof typ === 'object' && typ.literal !== undefined) {
    return typ.literal
  } else {
    return typeof typ
  }
}

function jsonToJSProps(typ: any): any {
  if (typ.jsonToJS === undefined) {
    const map: any = {}
    typ.props.forEach((p: any) => (map[p.json] = { key: p.js, typ: p.typ }))
    typ.jsonToJS = map
  }
  return typ.jsonToJS
}

function jsToJSONProps(typ: any): any {
  if (typ.jsToJSON === undefined) {
    const map: any = {}
    typ.props.forEach((p: any) => (map[p.js] = { key: p.json, typ: p.typ }))
    typ.jsToJSON = map
  }
  return typ.jsToJSON
}

function transform(
  val: any,
  typ: any,
  getProps: any,
  key: any = '',
  parent: any = '',
): any {
  function transformPrimitive(typ: string, val: any): any {
    if (typeof typ === typeof val) return val
    return invalidValue(typ, val, key, parent)
  }

  function transformUnion(typs: any[], val: any): any {
    // val must validate against one typ in typs
    const l = typs.length
    for (let i = 0; i < l; i++) {
      const typ = typs[i]
      try {
        return transform(val, typ, getProps)
      } catch (_) {}
    }
    return invalidValue(typs, val, key, parent)
  }

  function transformEnum(cases: string[], val: any): any {
    if (cases.indexOf(val) !== -1) return val
    return invalidValue(
      cases.map((a) => {
        return l(a)
      }),
      val,
      key,
      parent,
    )
  }

  function transformArray(typ: any, val: any): any {
    // val must be an array with no invalid elements
    if (!Array.isArray(val)) return invalidValue(l('array'), val, key, parent)
    return val.map((el) => transform(el, typ, getProps))
  }

  function transformDate(val: any): any {
    if (val === null) {
      return null
    }
    const d = new Date(val)
    if (isNaN(d.valueOf())) {
      return invalidValue(l('Date'), val, key, parent)
    }
    return d
  }

  function transformObject(
    props: { [k: string]: any },
    additional: any,
    val: any,
  ): any {
    if (val === null || typeof val !== 'object' || Array.isArray(val)) {
      return invalidValue(l(ref || 'object'), val, key, parent)
    }
    const result: any = {}
    Object.getOwnPropertyNames(props).forEach((key) => {
      const prop = props[key]
      const v = Object.prototype.hasOwnProperty.call(val, key)
        ? val[key]
        : undefined
      result[prop.key] = transform(v, prop.typ, getProps, key, ref)
    })
    Object.getOwnPropertyNames(val).forEach((key) => {
      if (!Object.prototype.hasOwnProperty.call(props, key)) {
        result[key] = transform(val[key], additional, getProps, key, ref)
      }
    })
    return result
  }

  if (typ === 'any') return val
  if (typ === null) {
    if (val === null) return val
    return invalidValue(typ, val, key, parent)
  }
  if (typ === false) return invalidValue(typ, val, key, parent)
  let ref: any = undefined
  while (typeof typ === 'object' && typ.ref !== undefined) {
    ref = typ.ref
    typ = typeMap[typ.ref]
  }
  if (Array.isArray(typ)) return transformEnum(typ, val)
  if (typeof typ === 'object') {
    return typ.hasOwnProperty('unionMembers')
      ? transformUnion(typ.unionMembers, val)
      : typ.hasOwnProperty('arrayItems')
        ? transformArray(typ.arrayItems, val)
        : typ.hasOwnProperty('props')
          ? transformObject(getProps(typ), typ.additional, val)
          : invalidValue(typ, val, key, parent)
  }
  // Numbers can be parsed by Date but shouldn't be.
  if (typ === Date && typeof val !== 'number') return transformDate(val)
  return transformPrimitive(typ, val)
}

function cast<T>(val: any, typ: any): T {
  return transform(val, typ, jsonToJSProps)
}

function uncast<T>(val: T, typ: any): any {
  return transform(val, typ, jsToJSONProps)
}

function l(typ: any) {
  return { literal: typ }
}

function a(typ: any) {
  return { arrayItems: typ }
}

function u(...typs: any[]) {
  return { unionMembers: typs }
}

function o(props: any[], additional: any) {
  return { props, additional }
}

function m(additional: any) {
  return { props: [], additional }
}

function r(name: string) {
  return { ref: name }
}

const typeMap: any = {
  DiscgolfMetrixResult: o(
    [
      { json: 'Competition', js: 'competition', typ: r('Competition') },
      { json: 'Errors', js: 'errors', typ: a('any') },
    ],
    false,
  ),
  Competition: o(
    [
      { json: 'ID', js: 'id', typ: 0 },
      { json: 'Name', js: 'name', typ: '' },
      { json: 'Type', js: 'type', typ: '' },
      { json: 'TourDateStart', js: 'tourDateStart', typ: Date },
      { json: 'TourDateEnd', js: 'tourDateEnd', typ: Date },
      { json: 'Date', js: 'date', typ: Date },
      { json: 'Time', js: 'time', typ: '' },
      { json: 'Comment', js: 'comment', typ: '' },
      { json: 'CourseName', js: 'courseName', typ: '' },
      { json: 'CourseID', js: 'courseID', typ: '' },
      { json: 'MetrixMode', js: 'metrixMode', typ: '' },
      { json: 'ShowPreviousRoundsSum', js: 'showPreviousRoundsSum', typ: null },
      { json: 'HasSubcompetitions', js: 'hasSubcompetitions', typ: 0 },
      { json: 'WeeklyHCSummary', js: 'weeklyHCSummary', typ: null },
      { json: 'WeeklyHC', js: 'weeklyHC', typ: a('any') },
      { json: 'Results', js: 'results', typ: a('any') },
      { json: 'Tracks', js: 'tracks', typ: a(r('Track')) },
      { json: 'ShowTourView', js: 'showTourView', typ: 0 },
      {
        json: 'SubCompetitions',
        js: 'subCompetitions',
        typ: a(r('SubCompetition')),
      },
    ],
    false,
  ),
  SubCompetition: o(
    [
      { json: 'ID', js: 'id', typ: '' },
      { json: 'Name', js: 'name', typ: '' },
      { json: 'Type', js: 'type', typ: '' },
      { json: 'TourDateStart', js: 'tourDateStart', typ: u(Date, null) },
      { json: 'TourDateEnd', js: 'tourDateEnd', typ: u(Date, null) },
      { json: 'Date', js: 'date', typ: Date },
      { json: 'Time', js: 'time', typ: '' },
      { json: 'Comment', js: 'comment', typ: '' },
      { json: 'CourseName', js: 'courseName', typ: '' },
      { json: 'CourseID', js: 'courseID', typ: '' },
      { json: 'MetrixMode', js: 'metrixMode', typ: '' },
      {
        json: 'ShowPreviousRoundsSum',
        js: 'showPreviousRoundsSum',
        typ: u(null, ''),
      },
      { json: 'HasSubcompetitions', js: 'hasSubcompetitions', typ: 0 },
      { json: 'WeeklyHCSummary', js: 'weeklyHCSummary', typ: null },
      { json: 'WeeklyHC', js: 'weeklyHC', typ: a('any') },
      { json: 'Results', js: 'results', typ: a(r('Result')) },
      { json: 'Tracks', js: 'tracks', typ: a(r('Track')) },
    ],
    false,
  ),
  Result: o(
    [
      { json: 'UserID', js: 'userID', typ: '' },
      { json: 'ScorecardID', js: 'scorecardID', typ: '' },
      { json: 'Name', js: 'name', typ: '' },
      { json: 'ClassName', js: 'className', typ: '' },
      { json: 'CountryCode', js: 'countryCode', typ: '' },
      { json: 'Group', js: 'group', typ: '' },
      {
        json: 'PlayerResults',
        js: 'playerResults',
        typ: a(u(a('any'), r('PlayerResultClass'))),
      },
      { json: 'Penalty', js: 'penalty', typ: null },
      { json: 'Sum', js: 'sum', typ: 0 },
      { json: 'Diff', js: 'diff', typ: 0 },
      { json: 'DNF', js: 'dnf', typ: null },
      { json: 'BUETotal', js: 'bueTotal', typ: '' },
      { json: 'GRHTotal', js: 'grhTotal', typ: '' },
      { json: 'OCPTotal', js: 'ocpTotal', typ: '' },
      { json: 'ICPTotal', js: 'icpTotal', typ: '' },
      { json: 'IBPTotal', js: 'ibpTotal', typ: '' },
      { json: 'PenaltiesTotal', js: 'penaltiesTotal', typ: '' },
      { json: 'PreviousRoundsSum', js: 'previousRoundsSum', typ: null },
      { json: 'PreviousRoundsDiff', js: 'previousRoundsDiff', typ: null },
      { json: 'Place', js: 'place', typ: 0 },
      { json: 'OrderNumber', js: 'orderNumber', typ: 0 },
    ],
    false,
  ),
  PlayerResultClass: o(
    [
      { json: 'Result', js: 'result', typ: '' },
      { json: 'Diff', js: 'diff', typ: 0 },
      { json: 'BUE', js: 'bue', typ: '' },
      { json: 'GRH', js: 'grh', typ: '' },
      { json: 'OCP', js: 'ocp', typ: '' },
      { json: 'ICP', js: 'icp', typ: '' },
      { json: 'IBP', js: 'ibp', typ: '' },
      { json: 'PEN', js: 'pen', typ: '' },
    ],
    false,
  ),
  Track: o(
    [
      { json: 'Number', js: 'number', typ: '' },
      { json: 'NumberAlt', js: 'numberAlt', typ: '' },
      { json: 'Par', js: 'par', typ: '' },
    ],
    false,
  ),
}
