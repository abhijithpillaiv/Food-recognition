import matplotlib.pyplot as plt
def main():
    acq=[]
    val_acq=[]
    loss=[]
    val_loss=[]
    epoch=[]
    f=open('history.txt','r')
    for row in f:
        row=row.split(',')
        acq.append(float(row[1]))
        loss.append(float(row[2]))
        val_acq.append(float(row[3]))
        val_loss.append(float(row[4]))
        epoch.append(int(row[0]))
    

    plt.plot(epoch, acq, label = "acquracy")
    plt.plot(epoch, val_acq, label = "acquracy")
    plt.title('model accuracy')
    plt.ylabel('accuracy')
    plt.xlabel('epoch')
    plt.legend(['train', 'test'], loc='lower right')
    plt.show()

    plt.plot(epoch, loss, label = "loss")
    plt.plot(epoch, val_loss, label = "loss")
    plt.title('model loss')
    plt.ylabel('loss')
    plt.xlabel('epoch')
    plt.legend(['train', 'test'], loc='lower right')
    plt.show()
main()
