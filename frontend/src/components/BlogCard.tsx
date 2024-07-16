import { Link } from "react-router-dom";
import React from 'react';

interface BlogCardProps {
    authorName: string,
    title: string,
    content: string,
    publishedDate: string,
    id: string
}

export default function BlogCard({
    id,
    authorName,
    title,
    content,
    publishedDate
}: BlogCardProps) {
    // Function to preserve new lines
    const formatContent = (text: string, maxLength: number) => {
      const truncated = text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
      return truncated.split('\n').map((line, index) => (
          <React.Fragment key={index}>
              {line}
              {index < truncated.split('\n').length - 1 && <br />}
          </React.Fragment>
      ));
  };

    return (
      <Link to={`/blog/${id}`}>
            <article className="border-b border-gray-200 pb-6 mx-4 md:mx-auto">
                <header className="flex flex-col md:flex-row items-center justify-between mb-2">
                    <div className="flex items-center space-x-2 mb-2 md:mb-0">
                        <div className="h-8 w-8 flex items-center justify-center bg-gray-300 text-gray-700 font-semibold rounded-full">
                            {`${authorName.substring(0,1)}`}
                        </div>
                        <div>
                            <div className="text-sm font-semibold">{authorName} - {`${publishedDate.substring(0,10)}`}</div>
                        </div>
                    </div>
                    <svg
                        className="h-6 w-6 text-gray-700"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M5 15l7-7 7 7"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                        />
                    </svg>
                </header>
                <h2 className="text-xl font-bold mb-2">
                    {`${title.substring(0,50)}`}...
                </h2>
                <div className="text-gray-700 mb-4 whitespace-pre-wrap">
                    {formatContent(content, 200)}
                </div>
                <footer className="flex items-center justify-between">
                    <div className="flex items-center space-x-1 text-xs text-gray-600">
                        <svg
                            className="h-4 w-4 text-gray-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M9 5l7 7-7 7"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                            />
                        </svg>
                        <span>·</span>
                        <span>{`${Math.ceil(content.length / 100)} min read`}</span>
                    </div>
                    <svg
                        className="h-6 w-6 text-gray-700"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M19 9l-7 7-7-7"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                        />
                    </svg>
                </footer>
            </article>
        </Link>
    );
}