import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import { firebase } from '../config'; // Adjust the import path based on your actual file structure

const NoteAdd = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [note, setNote] = useState('');

  const handleAddNote = () => {
    // Check if both title and note are not empty before proceeding
    if (title.trim() !== '' && note.trim() !== '') {
      // Add the note to Firebase Firestore
      firebase.firestore().collection('notes').add({
        title: title.trim(),
        note: note.trim(),
      })
        .then(() => {
          console.log('Note added to Firestore successfully');
        })
        .catch((error) => {
          console.error('Error adding note to Firestore:', error);
        });

      // Clear the input fields
      setTitle('');
      setNote('');

      // Navigate back to the Home screen
      navigation.goBack();
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Enter note title"
        onChangeText={(text) => setTitle(text)}
        value={title}
      />
      <TextInput
        placeholder="Enter your note here"
        onChangeText={(text) => setNote(text)}
        value={note}
        multiline
      />
      <Button title="Add Note" onPress={handleAddNote} />
    </View>
  );
};

export default NoteAdd;
