import { FaCheckCircle } from 'react-icons/fa';

interface FormSuccessProps {
  message?: string;
}

export const FormSuccess = ({ message }: FormSuccessProps) => {
  if (!message) return null;

  return (
    <div className='text-emerald-500 gap-x-2 text-sm bg-emerald-500/15 p-3 rounded-md flex items-center'>
      <FaCheckCircle className='h-4 w-4' />
      <p>{message}</p>
    </div>
  );
};
