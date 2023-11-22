import { toast } from "sonner"

interface NotificationProps{
  type: 'error' | 'success'
  message: string
}

export const notify = ({ type, message }: NotificationProps) => {
  if (type === 'error') toast.error(message)
  else toast.success(message)
}