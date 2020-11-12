import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const imageMarkdownRegex = /!\[([^\]]*)\]\(([^)]*)\)/;
const contentSplitRegex = /(!\[[^\]]*\]\([^)]*\))/;

const parseImageMarkdown = (slice) => {
  const [, alt, src] = imageMarkdownRegex.exec(slice);
  if (!src) return null;
  return <ContentImage alt={alt} src={src} />;
};
const parseParagraph = (slice) => <ContentParagraph>{slice}</ContentParagraph>;

const parseContent = (content) => content.split(contentSplitRegex)
  .reduce((jsxArray, slice) => {
    switch (true) {
      case imageMarkdownRegex.test(slice): {
        const image = parseImageMarkdown(slice);
        jsxArray.push(image);
        break;
      }
      case !slice: break;
      default: {
        const paragraph = parseParagraph(slice);
        jsxArray.push(paragraph);
      }
    }
    return jsxArray;
  }, []);

const CommentBody = ({ content = '' }) => {
  const body = useMemo(() => parseContent(content), [content]);
  return (
    <Wrapper>
      {body}
    </Wrapper>
  );
};

CommentBody.propTypes = {
  content: PropTypes.string,
};

const ContentParagraph = styled.p`
  all: unset;
  white-space: pre-wrap;
`;

const ContentImage = styled.img`
  max-width: 100%;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-size: 15px;
  font-weight: 400;

  padding: 1rem;
`;

export default CommentBody;
