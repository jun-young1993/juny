export function FolderIcon() {
	return (
	  <svg
	    width="14"
	    height="14"
	    viewBox="0 0 14 14"
	    fill="none"
	    xmlns="http://www.w3.org/2000/svg"
	    className="p-icon p-dialog-header-folder-icon"
	    aria-hidden="true"
	    data-pc-section="foldericon"
	  >
	    <rect x="2" y="4" width="10" height="10" fill="#D3D3D3"/>
	    <path d="M2 4H12V12H5.6L4.4 13H2V4Z" fill="#A9A9A9"/>
	  </svg>
	)
      }
      
      // 파일 아이콘 컴포넌트
export function FileIcon() {
	return (
	  <svg
	    width="14"
	    height="14"
	    viewBox="0 0 14 14"
	    fill="none"
	    xmlns="http://www.w3.org/2000/svg"
	    className="p-icon p-dialog-header-file-icon"
	    aria-hidden="true"
	    data-pc-section="fileicon"
	  >
	    <rect x="2" y="4" width="10" height="10" fill="#FFFFFF" stroke="#000000" strokeWidth="0.5"/>
	    <path d="M2 4H12V12H5.6L4.4 13H2V4Z" fill="#E6E6E6"/>
	  </svg>
	)
}