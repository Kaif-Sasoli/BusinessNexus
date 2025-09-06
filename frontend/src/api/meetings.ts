import { apiClient } from "../api/index";

export interface Participant {
  id: string;
  name: string;
  avatar?: string;
  status: "pending" | "accepted" | "rejected";
}

export interface Meeting {
  id: string;
  title: string;
  description?: string;
  startTime: string;
  endTime: string;
  status: "pending" | "accepted" | "rejected" | "cancelled";
  organizer: {
    id: string;
    name: string;
    avatar?: string;
  };
  participants: Participant[];
}

// Fetch all meetings for the user
export const getMeetings = async (): Promise<Meeting[]> => {
    
  const res = await apiClient.get<{ message: string; meetings: Meeting[] }>(
    "/meetings/get-meetings"
  );
  return res.data.meetings;
};

//  Create a new meeting
export const createMeeting = async (meetingData: {
  participants: string[];
  title: string;
  description?: string;
  startTime: string;
  endTime: string;
}): Promise<Meeting> => {
  console.log("meetingData: ", meetingData);
  const res = await apiClient.post<Meeting>("/meetings/create", meetingData);
  return res.data;
};

// Invertor Accept the meeting
export const acceptMeetingAPI = async (meetingId: string): Promise<{ message: string }> => {
  const res = await apiClient.put<{ message: string }>(`/meetings/accept/${meetingId}`);
  return res.data;
};

// Investor Reject the meeting
export const rejectMeetingAPI = async (meetingId: string): Promise<{ message: string }> => {
    console.log("UserId:", meetingId)
  const res = await apiClient.put<{ message: string }>(`/meetings/reject/${meetingId}`);
  return res.data;
};


// Organizer Cancel Meeting
export const cancelMeetingAPI = async (meetingId: string): Promise<{ message: string }> => {
  const res = await apiClient.put<{ message: string }>(`/meetings/cancel/${meetingId}`);
  return res.data;
};
