```
type CustomBreadcrumbsProps = {
  pageName: string;
  subPageName?: string;
};
```

```
type BreadcrumbItem = {
  title: JSX.Element | string; // Can be HTML tag | string
  href?: string;              
};
```
