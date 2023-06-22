interface PageHeaderProps {
  title: string;
}

export function PageHeader({ title }: PageHeaderProps) {
  return <div className={`text-2xl font-bold mt-8 mb-4`}>{title}</div>;
}
