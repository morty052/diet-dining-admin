export type memberProps = {
  admin_avatar: string;
  admin_firstname: string;
  admin_lastname: string;
  admin_email: string;
  expo_push_token: string;
  admin_role: string;
  _id: string;
  task_status: {
    completed_task?: boolean;
    pending_task?: boolean;
    started_task?: boolean;
  };
  remarks?: string;
};
