
import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Comment, Post } from "../types/Post";
import axios from "axios";
import { baseUrl } from "../utils/constants";

interface Props {
  post: Post;
}

const Card = ({ post }: Props) => {
  const [openComment, setOpenComments] = useState<boolean>(false);
  const [commentsList, setCommentsList] = useState<Comment[]>([]);

  const getComments = async () => {
    try {
      const response = await axios.get<Comment[]>(
        `${baseUrl}/comments?postId=${post.id}`
      );
      setCommentsList(response.data);
    } catch (error) {}
  };

  const handleOpen = async () => {
    if (!openComment) {
      await getComments();
    }
    setOpenComments(!openComment);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{post.title}</Text>
      <Text style={styles.body}>{post.body}</Text>
      <TouchableOpacity onPress={handleOpen}>
        <View style={styles.heartsContainer}>
          <AntDesign
            name="heart"
            size={24}
            color="#ff4d6d"
            style={styles.heartIcon}
          />
          <Text style={{ color: "#ff4d6d" }}>Click Here</Text>
        </View>
      </TouchableOpacity>
      {openComment && (
        <FlatList
          data={commentsList}
          renderItem={({ item }) => (
            <View>
              <Text style={styles.comment}>
                {item.name} - {item.email}
              </Text>
              <Text style={styles.comment}>{item.body}</Text>
            </View>
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    margin: 10,
    borderColor: "#ffcccc",
    borderWidth: 2,
    backgroundColor: "#ffebf0",
    borderRadius: 20,
  },
  title: {
    fontSize: 22,
    color: "#ff4d6d",
    marginBottom: 10,
  },
  body: {
    fontSize: 18,
    color: "#ff4d6d",
    marginBottom: 10,
  },
  comment: {
    fontSize: 16,
    color: "#ff4d6d",
    marginBottom: 5,
  },
  heartsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  heartIcon: {
    marginRight: 5,
  },
});

export default Card;
