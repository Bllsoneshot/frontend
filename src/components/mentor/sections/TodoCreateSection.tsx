import { useParams, useLocation, useNavigate } from "react-router-dom";
import StudyForm, { type StudyFormTodoPayload } from "../StudyForm";
import {
  createTasksByMentor,
  updateTaskByMentor,
  getTaskForEdit,
  type TaskEditResponse,
} from "../../../api/task";
import { useEffect, useState } from "react";
import type { SubjectKey } from "../../SubjectAddButton";

const TodoCreateSection = () => {
  const { menteeId, taskId: urlTaskId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [editData, setEditData] = useState<TaskEditResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const editTaskId = urlTaskId;
  const isEditMode = !!editTaskId;

  useEffect(() => {
    if (isEditMode && editTaskId) {
      const loadTask = async () => {
        try {
          setLoading(true);
          const data = await getTaskForEdit(editTaskId);
          setEditData(data);
        } catch (e) {
          console.error("Failed to fetch task detail for edit:", e);
        } finally {
          setLoading(false);
        }
      };
      loadTask();
    }
  }, [isEditMode, editTaskId]);

  if (loading) return <div>로딩 중...</div>;

  const pdfAttachment = editData?.worksheets?.[0];
  const linkAttachment = editData?.columnLinks?.[0];

  return (
    <StudyForm
      mode="todo"
      isEdit={isEditMode}
      title={isEditMode ? "할 일 수정" : "할 일 등록"}
      submitText={isEditMode ? "할 일 수정하기" : "할 일 등록하기"}
      initialSubject={editData?.subject as SubjectKey}
      initialDates={editData?.dates}
      initialTaskNames={editData?.taskNames}
      initialGoalMinutes={editData?.goalMinutes}
      initialFileId={pdfAttachment?.fileId}
      initialFileName={pdfAttachment?.fileName}
      initialLinkUrl={linkAttachment?.link}
      initialResourceMode={
        pdfAttachment ? "FILE" : linkAttachment ? "LINK" : "CHOICE"
      }
      onSubmit={async (payload) => {
        const p = payload as StudyFormTodoPayload;

        if (!menteeId) {
          alert("menteeId가 없습니다.");
          return;
        }

        try {
          if (isEditMode) {
            const req = {
              subject: p.subject,
              taskName: p.taskNames[0],
              goalMinutes: p.goalMinutes,
              worksheets: p.worksheets,
              columnLinks: p.columnLinks,
            };
            await updateTaskByMentor(editTaskId, req);
            alert("할 일이 수정되었습니다.");
            navigate(-1);
          } else {
            const req = {
              menteeId: Number(menteeId),
              subject: p.subject,
              dates: p.dates,
              taskNames: p.taskNames,
              goalMinutes: p.goalMinutes,
              worksheets: p.worksheets,
              columnLinks: p.columnLinks,
            };
            await createTasksByMentor(req);
            alert("할 일이 등록되었습니다.");
          }
        } catch (e) {
          console.error(e);
          alert(
            isEditMode
              ? "할 일 수정에 실패했습니다."
              : "할 일 등록에 실패했습니다."
          );
        }
      }}
    />
  );
};

export default TodoCreateSection;
