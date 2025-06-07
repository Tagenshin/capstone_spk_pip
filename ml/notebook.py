#!/usr/bin/env python
# coding: utf-8

# # Import Library

# In[47]:


import pandas as pd
import numpy as np
import seaborn as sns
import matplotlib.pyplot as plt

from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import confusion_matrix, classification_report
from imblearn.over_sampling import SMOTE

import tensorflow as tf
from tensorflow.keras.models import Sequential, load_model
from tensorflow.keras.layers import Dense, Dropout
from tensorflow.keras.callbacks import EarlyStopping
from tensorflow.keras.optimizers import Adam


import warnings
warnings.filterwarnings("ignore")


# # Load data

# In[28]:


df = pd.read_excel("dataset/data_pip_cleaned.xlsx")
df.head()


# In[29]:


df.info()


# # Preprocessing Data

# Mengelompokkan data penghasilan orang tua : rendah, sedang, tinggi

# In[30]:


df_binning = df.copy()


# Membuat Fungsi kategori penghasilan

# In[31]:


def kategori_penghasilan(nilai):
    if nilai <= 1500000:
        return 'Rendah'
    elif nilai <= 3000000:
        return 'Sedang'
    else:
        return 'Tinggi'


# In[32]:


df_binning['Penghasilan Orang Tua'] = df['Penghasilan Orang Tua'].apply(kategori_penghasilan)

cek = pd.DataFrame({
    'Penghasilan Orang Tua': df['Penghasilan Orang Tua'],
    'Kategori': df_binning['Penghasilan Orang Tua']
})


# Manampilkan Plot jumlah masing-masing kategori

# In[33]:


counts = df_binning['Penghasilan Orang Tua'].value_counts().sort_index()

plt.figure(figsize=(8,5))
counts.plot(kind='bar')
plt.title('Distribusi Kategori Penghasilan Orang Tua')
plt.xlabel('Kategori Penghasilan')
plt.ylabel('Jumlah Siswa')
plt.xticks(rotation=0)
plt.show()


# Menampilkan nilai Unik tiap kolom

# In[34]:


for col in df_binning.columns:
    unique_vals = df_binning[col].unique()
    print(f"Kolom '{col}' memiliki nilai unik sebanyak {len(unique_vals)}:")
    print(unique_vals)
    print('-' * 40)


# Mapping kolom Status Layak: 1, Tidak Layak: 0

# In[35]:


df = df_binning.copy()
mapping = {'Layak': 1, 'Tidak Layak': 0}
df['Status'] = df['Status'].map(mapping)
df.head()


# Meng Encode Kolom Kategori

# In[36]:


def fit_label_encoders(unique_values):
    label_encoders = {}
    for col, classes in unique_values.items():
        le = LabelEncoder()
        le.fit(classes)
        label_encoders[col] = le
    return label_encoders

def transform_df(df, label_encoders):
    df_encoded = df.copy()
    for col, le in label_encoders.items():
        if col in df_encoded.columns:
            # Pastikan nilai di df ada dalam kelas yang sudah fit
            unknown_mask = ~df_encoded[col].isin(le.classes_)
            if unknown_mask.any():
                raise ValueError(
                    f"Kolom '{col}' mengandung kategori yang tidak dikenal: "
                    f"{df_encoded.loc[unknown_mask, col].unique()}"
                )
            df_encoded[col] = le.transform(df_encoded[col])
    return df_encoded

unique_values = {
    'Alat Transportasi': ['Jalan kaki', 'Sepeda motor', 'Lainnya'],
    'Pekerjaan Orang Tua': ['Wirausaha', 'Lainnya', 'Peternak', 'Petani', 'Buruh'],
    'Penghasilan Orang Tua': ['Tinggi', 'Sedang', 'Rendah'],
    'Jumlah Tanggungan': ['1', 'Lebih dari 3', '2', '3'],
    'Pemilik KIP': ['Tidak', 'Ya'],
    'Pemilik KPS': ['Tidak', 'Ya']
}

# Fit encoder (sekali untuk kelas lengkap)
label_encoders = fit_label_encoders(unique_values)


# In[37]:


df_encoded = transform_df(df, label_encoders)
df_encoded.head()


# ## Spliting data

# In[38]:


X = df_encoded.drop(columns=['Status'])
y = df_encoded['Status']

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

print(f"X_train shape: {X_train.shape}")
print(f"X_test shape: {X_test.shape}")
print(f"y_train shape: {y_train.shape}")
print(f"y_test shape: {y_test.shape}")


# ## Model Development dengan Artificial Neural Network (ANN)

# Build model ANN

# In[50]:


model_ann = Sequential([
    Dense(64, activation='relu', input_shape=(X_train.shape[1],)),
    Dropout(0.5),
    Dense(64, activation='relu'),
    Dropout(0.3),
    Dense(1, activation='sigmoid')
])

model_ann.compile(optimizer= Adam(learning_rate=0.001),
              loss='binary_crossentropy',
              metrics=['accuracy'])

model_ann.summary()


# ### Callback

# In[40]:


early_stop = EarlyStopping(
    monitor='val_loss',
    patience=3,
    restore_best_weights=True
)


# # Training Model

# In[51]:


# Train model
history_ann = model_ann.fit(
    X_train, y_train,
    epochs=50,
    batch_size=16,
    validation_split=0.2,
    callbacks=[early_stop],
    verbose=1
)


# Menampilkan Plot training history dari accuracy dan loss

# In[52]:


plt.figure(figsize=(12, 4))
plt.subplot(1, 2, 1)
plt.plot(history_ann.history['accuracy'], label='Train Accuracy')
plt.plot(history_ann.history['val_accuracy'], label='Validation Accuracy')
plt.title('Model Accuracy')
plt.xlabel('Epochs')
plt.ylabel('Accuracy')
plt.legend()

plt.subplot(1, 2, 2)
plt.plot(history_ann.history['loss'], label='Train Loss')
plt.plot(history_ann.history['val_loss'], label='Validation Loss')
plt.title('Model Loss')
plt.xlabel('Epochs')
plt.ylabel('Loss')
plt.legend()
plt.tight_layout()
plt.show()


# ## Evaluasi model

# In[53]:


loss, accuracy = model_ann.evaluate(X_test, y_test)
loss_train, accuracy_train = model_ann.evaluate(X_train, y_train)


print("=====================================")
print("Hasil Evaluasi model ANN")
print("=====================================")
print(f"Test Accuracy: {accuracy}")
print(f"Test Loss: {loss}")
print("=====================================")
print(f"Train Accuracy: {accuracy_train}")
print(f"Train Loss: {loss_train}")


# Menampilkan Confusion matrix

# In[54]:


y_pred_ann = model_ann.predict(X_test)
y_pred_ann = (y_pred_ann > 0.5).astype(int)

cm = confusion_matrix(y_test, y_pred_ann)
plt.figure(figsize=(8, 6))
sns.heatmap(cm, annot=True, fmt='d', cmap='Blues', cbar=True)
plt.title('Confusion Matrix')
plt.xlabel('Predicted')
plt.ylabel('True')
plt.show()


# Menampilkan classification report

# In[55]:


print(classification_report(y_test, y_pred_ann))


# Menyimpan bobot model ke file HDF5

# In[ ]:


# model_ann.save("model/model_ann.h5")


# ### Evaluasi pada 10 data actual berlabel

# ### Load Model

# In[58]:


model = load_model('model/model_ann.h5')


# Load data

# In[59]:


df_label = pd.read_excel('data_test/data_actual.xlsx')


# Data Preprocessing

# In[60]:


df_pred = df_label.drop(columns='Status')
df_pred['Penghasilan Orang Tua'] = df_pred['Penghasilan Orang Tua'].apply(kategori_penghasilan)
df_pred.head()


# In[61]:


df_pred = transform_df(df_pred, label_encoders)
df_pred.head()


# Melakukan prediksi pada data

# In[62]:


y_pred_probs = model.predict(df_pred)
y_pred = (y_pred_probs > 0.5).astype(int).reshape(-1)

label_mapping = {0: 'Tidak Layak', 1: 'Layak'}

df_label['Status_Pred'] = [label_mapping[p] for p in y_pred]

print("Hasil Prediksi Model pada data baru:")
prediksi = pd.DataFrame({
    'Status_actual': df_label['Status'],
    'Status_pred': df_label['Status_Pred']
})

print(prediksi)

y_true_numeric = df_label['Status'].map({'Layak': 1, 'Tidak Layak': 0})
report = classification_report(y_true_numeric, y_pred, target_names=['Tidak Layak', 'Layak'])

print("============================")
print("Classification Report:")
print(report)


# Insight: Berdasarkan hasil prediksi, model menunjukkan akurasi 90% dalam memprediksi status kelayakan, dengan precision tinggi pada kedua kategori ('Tidak Layak' dan 'Layak'), namun recall untuk kategori 'Layak' masih dapat diperbaiki.

# ## Inference

# Load Data test

# In[63]:


df_test = pd.read_excel('data_test/data_10baris.xlsx')
df_test.head()


# ### Data preprocessing

# In[64]:


df_test['Penghasilan Orang Tua'] = df_test['Penghasilan Orang Tua'].apply(kategori_penghasilan)
df_test.head()


# In[65]:


df_test = transform_df(df_test, label_encoders)
df_test.head()


# Melakukan prediksi pada data baru

# In[66]:


y_pred_probs = model.predict(df_test)
y_pred = (y_pred_probs > 0.5).astype(int).reshape(-1)

label_mapping = {0: 'Tidak Layak', 1: 'Layak'}

df_actual = pd.read_excel('data_test/data_10baris.xlsx')
df_actual['Status'] = [label_mapping[p] for p in y_pred]

print("Hasil Prediksi Model pada data baru:")
df_actual.head(10)


# Menyimpan model dalam bentuk JSON melalui Google Colab

# In[67]:


# import subprocess

# subprocess.run([
#     "tensorflowjs_converter",  
#     "--input_format", "keras",
#     "/content/sample_data/model_ann.h5",  
#     "/content/sample_data/model_tfjs"     
# ])

