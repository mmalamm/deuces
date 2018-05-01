import React from "react";
import AvatarEditor from "react-avatar-editor";

class MyEditor extends React.Component {
  render() {
    return (
      <AvatarEditor
        image={this.props.image}
        width={250}
        height={250}
        border={50}
        color={[0, 0, 0, 0.6]} // RGBA
        scale={this.props.scale}
        rotate={0}
      />
    );
  }
}

export default MyEditor;
