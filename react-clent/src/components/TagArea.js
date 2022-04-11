import React, { useState } from 'react';
import { WithContext as ReactTags } from 'react-tag-input';

const KeyCodes = {
  comma: 188,
  enter: 13,
};

function TagArea({
  tags,
  handleDelete,
  handleAddition,
  handleDrag,
  handleTagClick,
}) {
  const delimiters = [KeyCodes.comma, KeyCodes.enter];
  return (
    <div className="tag">
      <ReactTags
        tags={tags}
        suggestions={[]}
        delimiters={delimiters}
        handleDelete={handleDelete}
        handleAddition={handleAddition}
        handleDrag={handleDrag}
        handleTagClick={handleTagClick}
        inputFieldPosition="bottom"
        autocomplete
        autofocus={false}
        placeholder="Enter a tag"
      />
    </div>
  );
}

export default TagArea;
