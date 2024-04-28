export function Footer() {
  return (
    <div className="bg-white border-t">
      <div className="mx-auto py-10">
        <p className="text-center text-xs text-black">
          &copy; {new Date().getFullYear()} Store. All rights reserved.
        </p>
      </div>
    </div>
  );
}
