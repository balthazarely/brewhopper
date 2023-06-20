interface PageWrapperProps {
  children: React.ReactNode;
  classname: string;
}

export function PageWrapper({ children, classname }: PageWrapperProps) {
  return (
    <div className={`mx-auto px-4 max-w-6xl ${classname}`}>{children}</div>
  );
}
