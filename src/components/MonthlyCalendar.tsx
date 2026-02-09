import { useMemo } from "react";
import styled from "styled-components";

type DateKey = `${number}-${string}-${string}`; // "YYYY-MM-DD"

type Props = {
  selectedDate: Date;
  monthDate?: Date;

  onSelectDate: (next: Date) => void;
  onChangeMonth?: (nextMonthDate: Date) => void;

  remainingCountByDate?: Record<DateKey, number>;

  weekLabels?: string[];

  className?: string;
};

const WEEK_DEFAULT = ["월", "화", "수", "목", "금", "토", "일"];

function pad2(n: number) {
  return String(n).padStart(2, "0");
}

function toKey(d: Date): DateKey {
  const y = d.getFullYear();
  const m = pad2(d.getMonth() + 1);
  const day = pad2(d.getDate());
  return `${y}-${m}-${day}` as DateKey;
}

function startOfMonth(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), 1);
}
function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export default function MonthlyCalendar({
  selectedDate,
  monthDate,
  onSelectDate,
  remainingCountByDate = {},
  weekLabels = WEEK_DEFAULT,
  className,
}: Props) {
  const baseMonth = monthDate ?? selectedDate;

  const today = useMemo(() => new Date(), []);
  const monthStart = useMemo(() => startOfMonth(baseMonth), [baseMonth]);

  const firstDay = monthStart.getDay(); // 일0~토6
  const firstDayMonBased = (firstDay + 6) % 7; // 월0~일6

  const gridStart = useMemo(() => {
    const d = new Date(monthStart);
    d.setDate(d.getDate() - firstDayMonBased);
    return d;
  }, [monthStart, firstDayMonBased]);

  const days = useMemo(() => {
    return Array.from({ length: 42 }).map((_, i) => {
      const d = new Date(gridStart);
      d.setDate(gridStart.getDate() + i);
      const inMonth =
        d.getFullYear() === baseMonth.getFullYear() &&
        d.getMonth() === baseMonth.getMonth();

      const key = toKey(d);
      const remain = remainingCountByDate[key] ?? 0;

      const selected = isSameDay(d, selectedDate);
      const isToday = isSameDay(d, today);

      return { d, inMonth, key, remain, selected, isToday };
    });
  }, [gridStart, baseMonth, remainingCountByDate, selectedDate, today]);

  return (
    <Wrap className={className}>
      <WeekRow>
        {weekLabels.map((w) => (
          <WeekCell key={w}>{w}</WeekCell>
        ))}
      </WeekRow>

      <Grid>
        {days.map(({ d, inMonth, key, remain, selected, isToday }) => {
          const dayNum = d.getDate();

          return (
            <DayCell key={key}>
              <DayButton
                type="button"
                $selected={selected}
                onClick={() => onSelectDate(new Date(d))}
              >
                <DayNumber
                  $inMonth={inMonth}
                  $selected={selected}
                  $today={isToday}
                >
                  {dayNum}
                </DayNumber>
              </DayButton>

              {remain > 0 ? (
                <RemainText>{remain}</RemainText>
              ) : (
                <RemainSpacer />
              )}
            </DayCell>
          );
        })}
      </Grid>
    </Wrap>
  );
}

const Wrap = styled.div`
  width: 100%;
  background: var(--color-white);
`;

const WeekRow = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  padding: 0 8px 8px;
`;

const WeekCell = styled.div`
  text-align: center;
  font-size: 12px;
  color: var(--color-gray-400);
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  row-gap: 8px;
  padding: 0 8px 0;
`;

const DayCell = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const DayButton = styled.button<{
  $selected: boolean;
}>`
  width: 34px;
  height: 34px;
  border: 0;
  border-radius: 999px;
  background: ${({ $selected }) =>
    $selected ? "var(--color-primary-500)" : "transparent"};
  display: grid;
  place-items: center;
  cursor: pointer;

  &:active {
    transform: scale(0.98);
  }
`;

const DayNumber = styled.span<{
  $inMonth: boolean;
  $selected: boolean;
  $today: boolean;
}>`
  font-size: 14px;
  font-weight: 600;
  color: ${({ $inMonth, $selected, $today }) => {
    if ($selected) return "var(--color-white)";
    if ($today) return "var(--color-primary-500)";
    return $inMonth ? "var(--color-black)" : "var(--color-gray-300)";
  }};
`;

const RemainText = styled.div`
  margin-top: 4px;
  font-size: 12px;
  font-weight: 600;
  color: var(--color-primary-500);
  line-height: 1;
`;

const RemainSpacer = styled.div`
  height: 16px;
`;
