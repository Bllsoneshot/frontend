import type { MenteeInfoData } from "../components/mentor/MenteeInfo";
import type { MentorMenteeRow } from "../components/mentor/MenteeListTable";

export const mockMentorMenteeRows: MentorMenteeRow[] = [
  {
    menteeId: 1,
    name: "김태우",
    gradeLabel: "고등학교 2학년",
    subjectsLabel: "영어, 수학",
    recentStudyLabel: "2026-02-05 / 영단어 10개 외우기",
    status: "SUBMITTED",
  },
  {
    menteeId: 2,
    name: "이만재",
    gradeLabel: "고등학교 3학년",
    subjectsLabel: "국어, 영어, 수학",
    recentStudyLabel: "2026-02-01 / 평가원모의고사 풀이",
    status: "SUBMITTED",
  },
  {
    menteeId: 3,
    name: "김준",
    gradeLabel: "고등학교 3학년",
    subjectsLabel: "국어, 영어, 수학",
    recentStudyLabel: "2026-02-05 / RPM 3단원 오답노트",
    status: "NOT_SUBMITTED",
  },
  {
    menteeId: 4,
    name: "김다은",
    gradeLabel: "고등학교 1학년",
    subjectsLabel: "국어, 수학",
    recentStudyLabel: "2026-02-04 / 작품 분석 2편",
    status: "SUBMITTED",
  },
  {
    menteeId: 5,
    name: "이서영",
    gradeLabel: "고등학교 2학년",
    subjectsLabel: "국어, 영어",
    recentStudyLabel: "2026-02-04 / 시대인재 국어",
    status: "SUBMITTED",
  },
  {
    menteeId: 6,
    name: "주현지",
    gradeLabel: "고등학교 3학년",
    subjectsLabel: "영어",
    recentStudyLabel: "2026-02-05 / 9월 모의고사 오답노트",
    status: "SUBMITTED",
  },
];

export const toMenteeInfoData = (row: MentorMenteeRow): MenteeInfoData => ({
  menteeId: row.menteeId,
  name: row.name,
  gradeLabel: row.gradeLabel,
  subjects: row.subjectsLabel
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean),
});

/** id로 멘티 row 찾기 */
export const getMockMenteeById = (menteeId: string | number) => {
  const idNum = Number(menteeId);
  return mockMentorMenteeRows.find((r) => Number(r.menteeId) === idNum) ?? null;
};
