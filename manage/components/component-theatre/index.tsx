import { useEffect, useState } from "react";

/**
 * 场景编辑器demo
 * @link https://www.theatrejs.com/
 */
export const TheatreDemo: React.FC = () => {
	const [isClient, setIsClient] = useState(false);
	const [TheatreContent, setTheatreContent] = useState<React.ComponentType | null>(null);

	useEffect(() => {
		setIsClient(true);

		// 动态导入 Theatre.js 相关模块（仅在客户端）
		import("./TheatreContent").then((module) => {
			setTheatreContent(() => module.TheatreContent);
		}).catch((error) => {
			console.error("Failed to load Theatre.js:", error);
		});
	}, []);

	if (!isClient || !TheatreContent) {
		return (
			<div className="flex items-center justify-center h-full">
				<p className="text-lg">Loading Theatre.js...</p>
			</div>
		);
	}

	return <TheatreContent />;
};

export default TheatreDemo;
